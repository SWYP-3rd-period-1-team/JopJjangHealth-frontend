import React, {useState} from 'react';
import styles from '../../styles/UserProfile.module.css';
import Image from 'next/image';
import basicImgOne from '../../../public/character_one.png';
import basicImgTwo from '../../../public/character_two.png';
import basicImgThree from '../../../public/character_three.png';
import basicImgFour from '../../../public/character_four.png';

const ChangeBasicImage: () => React.JSX.Element = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleSelectImage = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <div>
            <div className={styles.images_container}>
                <div
                    className={`${styles.basic_img} ${
                        selectedIndex === 0 ? styles.selected : ''
                    }`}
                    onClick={() => handleSelectImage(0)}
                >
                    <Image src={basicImgOne} alt={'기본사진 1'} />
                </div>
                <div
                    className={`${styles.basic_img} ${
                        selectedIndex === 1 ? styles.selected : ''
                    }`}
                    onClick={() => handleSelectImage(1)}
                >
                    <Image src={basicImgTwo} alt={'기본사진 2'} />
                </div>
                <div
                    className={`${styles.basic_img} ${
                        selectedIndex === 2 ? styles.selected : ''
                    }`}
                    onClick={() => handleSelectImage(2)}
                >
                    <Image src={basicImgThree} alt={'기본사진 3'} />
                </div>
                <div
                    className={`${styles.basic_img} ${
                        selectedIndex === 3 ? styles.selected : ''
                    }`}
                    onClick={() => handleSelectImage(3)}
                >
                    <Image src={basicImgFour} alt={'기본사진 4'} />
                </div>
            </div>
            <button type="submit" className={styles.checkButton}>
                확인
            </button>
        </div>
    );
};

export default ChangeBasicImage;
