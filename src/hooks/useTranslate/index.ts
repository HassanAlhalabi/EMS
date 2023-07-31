import { useTranslation } from 'react-i18next';

import en from '../../i18n/en/en.json';

export type TranslateKey = keyof typeof en

const useTranslate = () => {
    const { t: translate } = useTranslation();

    const t = (key: TranslateKey) => translate(key);

    return t;
}
 
export default useTranslate;