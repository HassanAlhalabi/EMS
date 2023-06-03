import { useContext } from 'react';

import styled from 'styled-components';

import LogoImage from '../../../public/logo.png';
import { LayoutContext } from '../../contexts/layout-context';


const StyledLogo = styled.img.attrs({src: LogoImage})<{theme: string}>`
    max-width: 100%;
    min-width: 180px;   
    width: 200px;
    filter: ${props => props.theme === 'DARK' ? "brightness(0) invert(1)" : null}
`

const Logo = () => { 
    const {theme} = useContext(LayoutContext)
    return <StyledLogo theme={theme}/> 
}

export default Logo;