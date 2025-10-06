import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = ({
	setFormStates,
}: {
	setFormStates: (data: Record<string, OptionType>) => void;
}) => {
	const defaultValues = {
		selectFont: fontFamilyOptions[0],
		selectFontSize: fontSizeOptions[0],
		selectFontColor: fontColors[0],
		selectBackgroundColor: backgroundColors[0],
		selectContentWidth: contentWidthArr[0],
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [dataForm, setDataForm] = useState(defaultValues);
	const sideBarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				sideBarRef.current &&
				!sideBarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, []);

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setDataForm(defaultValues);
		setFormStates(defaultValues);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormStates(dataForm);
	};

	const toggleContainer = (): void => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={toggleContainer} isOpen={isOpen} />
			<aside
				ref={sideBarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						align={'left'}
						weight={800}
						size={31}
						uppercase={true}
						as={'h2'}>
						задайте параметры
					</Text>
					<Select
						selected={dataForm.selectFont}
						onChange={(selected) =>
							setDataForm({ ...dataForm, selectFont: selected })
						}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={dataForm.selectFontSize}
						name='radio'
						onChange={(selected) =>
							setDataForm({ ...dataForm, selectFontSize: selected })
						}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={dataForm.selectFontColor}
						onChange={(selected) =>
							setDataForm({ ...dataForm, selectFontColor: selected })
						}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={dataForm.selectBackgroundColor}
						onChange={(selected) =>
							setDataForm({ ...dataForm, selectBackgroundColor: selected })
						}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={dataForm.selectContentWidth}
						onChange={(selected) =>
							setDataForm({ ...dataForm, selectContentWidth: selected })
						}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
