import React, {Component} from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';

const dictionary = require('lib/dictionary');

class Header extends Component {
    constructor(props) {
        super(props);
    };
    componentDidMount(){
        this.props.showMenuReset(this.props.menuTriggerStatus);
    };
    render() {
        return (
            <header className={`header ${this.props.imageClassName}`}>
                <div className="headerBlock">
                    <MediaQuery query="(max-width: 749px)">
                        <div className="menuTrigger" onClick={this.props.onMenuTriggerClick(this.props.menuTriggerStatus)}>
                            <img src={this.props.menuTriggerStatus ? '/src/assets/img/cancel-music.svg' : '/src/assets/img/menu.svg'} alt="" className="menuSvg" />
                        </div>
                        <div className={`closeMenu ${this.props.menuTriggerClassName}`} onClick={this.props.onMenuTriggerClick(this.props.menuTriggerStatus)} />
                    </MediaQuery>
                    <div className="row">
                        <ul className={`menu ${this.props.menuTriggerClassName}`}>
                            <li className="menuLi">
                                <Link to="/" className={('/' === this.props.path) ? 'active' : null}>{dictionary[this.props.language].header.main}</Link>
                            </li>
                            <li className="menuLi">
                                <Link to="/technology" className={('/technology' === this.props.path) ? 'active' : null}>{dictionary[this.props.language].header.technology}</Link>
                            </li>
                            <li className="menuLi">
                                <Link to="/interesting" className={('/interesting' === this.props.path.slice(0,12)) ? 'active' : null}>{dictionary[this.props.language].header.hobby}</Link>
                                <ul className="subMenu">
                                    <li className="menuLi subMenuLi">
                                        <Link to="/interesting/literature" className={('/interesting/literature' === this.props.path) ? 'active' : null}>{dictionary[this.props.language].header.literature}</Link>
                                    </li>
                                    <li className="menuLi subMenuLi">
                                        <Link to="/interesting/sport" className={('/interesting/sport' === this.props.path) ? 'active' : null}>{dictionary[this.props.language].header.sport}</Link>
                                    </li>
                                    <li className="menuLi subMenuLi">
                                        <Link to="/interesting/games" className={('/interesting/games' === this.props.path) ? 'active' : null}>{dictionary[this.props.language].header.games}</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="menuLi">
                                <Link to="/contacts" className={('/contacts' === this.props.path) ? 'active' : null}>{dictionary[this.props.language].header.contacts}</Link>
                            </li>
                        </ul>
                        <div className={`flag ${this.props.language}`} onClick={this.props.changeLanguage((this.props.language === 'ru') ? 'en' : 'ru')} />
                    </div>
                    {('/' === this.props.path) ? (
                        <div className="autorPhotoBlock">
                            <div className="row">
                                <div className="autorPhotoBlockLimit">
                                    <div className="likeField" onClick={this.props.setLike(this.props.countOfLike + 1)}>
                                        <div className="likePush">
                                            <img src="/src/assets/img/likeWhite.svg" alt="" className="thumbsUpOnImg" />
                                        </div>
                                        <img className="profilePhoto" src="/src/assets/img/my_photo.jpg" alt="" />
                                    </div>
                                    <div className="likesBlock">
                                        <img src="/src/assets/img/likeWhite.svg" alt="" className="thumbsUp" onClick={this.props.setLike(this.props.countOfLike + 1)} />
                                        <span className="countOfLikes">{this.props.countOfLike}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <div className="headerTitle"><div className="row"><h1 className="headerTitleH1">{dictionary[this.props.language].header[this.props.title+'Title']}</h1></div></div>
                </div>
            </header>
        )
    }
}

export default connect(
    state => ({
        imageClassName: state.changeHeader.headerClassName,
        title: state.changeHeader.headerTitle,
        path: state.changeHeader.path,
        menuTriggerClassName: state.menuTrigger.menuTriggerClassName,
        menuTriggerStatus: state.menuTrigger.menuTriggerStatus,
        language: state.changeLanguage.language,
    }),
    dispatch => ({
        onMenuTriggerClick: (status) => () => {
            dispatch({ type: 'menuTrigger', payload: {
                menuTriggerStatus: !status,
            } })
        },
        showMenuReset: (status) => () => {
            if (status) {
                dispatch({ type: 'menuTrigger', payload: {
                    menuTriggerStatus: false,
                } })
            }
        },
        changeLanguage: (language) => () => {
            console.log(language);
            dispatch({
                type: 'changeLanguage',
                payload: { language: language }
            })
        }
    })
)(Header);
