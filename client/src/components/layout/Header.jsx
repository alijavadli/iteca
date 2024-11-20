import { useAtom } from 'jotai'
import { langAtom } from '../../store/atoms'
import { Select } from '../common/Select'
import logo from '../../assets/logo.svg'
import ukFlag from '../../assets/uk-flag.svg'
import ruFlag from '../../assets/ru-flag.svg'
import kzFlag from '../../assets/kz-flag.svg'

export const Header = () => {
    const [lang, setLang] = useAtom(langAtom)

    const languageOptions = [
        { value: 'en', label: 'EN', flag: ukFlag },
        { value: 'ru', label: 'RU', flag: ruFlag },
        { value: 'kz', label: 'KZ', flag: kzFlag },
    ];

    return (
        <header className="header" style={{ backgroundColor: '#F8F9FA', borderBottom: '1px solid #DEE2E6' }}>
            <div className="container-fluid">
                <div className="row align-items-center" style={{ height: '64px' }}>
                    <div className="col">
                        <img src={logo} alt="Iteca" width="60px" />
                    </div>
                    <div className="col-auto d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <Select
                                value={lang}
                                onChange={setLang}
                                options={languageOptions}
                                showFlag={true}
                            />
                            <nav className="d-flex">
                                <a href="/" className="nav-header-link px-3">About the exhibition</a>
                                <a href="/" className="nav-header-link px-3">Exhibition plan</a>
                                <a href="/" className="nav-header-link px-3">FAQ</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}