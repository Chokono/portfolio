import React, {Component} from "react";
import { Link, NavLink } from "react-router-dom";
import cx from 'classnames';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

const dictionary = require('lib/dictionary');
const headerImagesSrc = require('lib/headerImagesSrc');

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHeaderImageLoading: true
        }
        this.clickLike = this.clickLike.bind(this);
        this.imageLoad = this.imageLoad.bind(this);
    };
    clickLike() {
        if (this.props.countOfLike !== 'loading') {
            this.props.setLike(this.props.countOfLike);
        }
    }
    imageLoad() {
        setTimeout( () =>{
            this.setState({isHeaderImageLoading: false});
        }, 200);

    }
    componentDidMount(){
        this.props.showMenuReset(true)();
    };
    render() {
        return (
            <>
                <header className={cx("header", this.props.imageClassName)}>
                    <div className={cx('headerImBlock', this.props.imageClassName, {'headerBlur': this.state.isHeaderImageLoading})}></div>
                    {this.state.isHeaderImageLoading && <div className="smallHeaderImage headerBlur"></div>}
                    <picture className='headerImageContainer'>
                        <source media="(max-width: 750px)" srcSet={headerImagesSrc[this.props.imageClassName][750]} />
                        <source media="(max-width: 1200px)" srcSet={headerImagesSrc[this.props.imageClassName][1200]} />
                        <img src={headerImagesSrc[this.props.imageClassName][1920]} alt="" onLoad={this.imageLoad}/>
                    </picture>
                    <div className="headerBlock">
                        <MediaQuery query="(max-width: 749px)">
                            <div className="menuTrigger" onClick={this.props.onMenuTriggerClick(this.props.menuTriggerStatus)}>
                                <img src={this.props.menuTriggerStatus ? '/src/assets/img/cancel-music.svg' : '/src/assets/img/menu.svg'} alt="" className="menuSvg" />
                            </div>
                        </MediaQuery>
                        <div className="row">
                            {!this.props.menuTriggerStatus && (
                                <ul className={`menu ${this.props.menuTriggerClassName}`}>
                                    <li className="menuLi">
                                        <Link to="/" className={cx({['active']:'/' === this.props.path})}>{dictionary[this.props.language].header.main}</Link>
                                    </li>
                                    <li className="menuLi">
                                        <NavLink to="/technology" activeClassName='active'>{dictionary[this.props.language].header.technology}</NavLink>
                                    </li>
                                    <li className="menuLi">
                                        <NavLink to="/interesting" activeClassName='active'>{dictionary[this.props.language].header.hobby}</NavLink>
                                        <ul className="subMenu">
                                            <li className="menuLi subMenuLi">
                                                <NavLink to="/interesting/literature" activeClassName='active'>{dictionary[this.props.language].header.literature}</NavLink>
                                            </li>
                                            <li className="menuLi subMenuLi">
                                                <NavLink to="/interesting/sport" activeClassName='active'>{dictionary[this.props.language].header.sport}</NavLink>
                                            </li>
                                            <li className="menuLi subMenuLi">
                                                <NavLink to="/interesting/games" activeClassName='active'>{dictionary[this.props.language].header.games}</NavLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menuLi">
                                        <NavLink to="/contacts" activeClassName='active'>{dictionary[this.props.language].header.contacts}</NavLink>
                                    </li>
                                </ul>
                            )}
                            <div className={`flag ${this.props.language}`} onClick={this.props.changeLanguage((this.props.language === 'ru') ? 'en' : 'ru')} />
                        </div>
                        {('/' === this.props.path) ? (
                            <div className="autorPhotoBlock">
                                <div className="row">
                                    <div className="autorPhotoBlockLimit">
                                        <div className="likeField" onClick={this.clickLike}>
                                            <div className="likePush">
                                                <img src="/src/assets/img/likeWhite.svg" alt="" className="thumbsUpOnImg" />
                                            </div>
                                            <img className="profilePhoto" src="/src/assets/img/my_photo.jpg" alt="" />
                                        </div>
                                        <div className="likesBlock">
                                            <img src="/src/assets/img/likeWhite.svg" alt="" className="thumbsUp" onClick={this.clickLike} />
                                            <span className="countOfLikes">{this.props.countOfLike}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        <div className="headerTitle"><div className="row"><h1 className="headerTitleH1">{dictionary[this.props.language].header[this.props.title+'Title']}</h1></div></div>
                    </div>
                </header>
                <MediaQuery query="(max-width: 749px)">
                    <div className={`closeMenu ${this.props.menuTriggerClassName}`} onClick={this.props.onMenuTriggerClick(this.props.menuTriggerStatus)} />
                </MediaQuery>
                {this.props.menuTriggerStatus && (
                    <ul className={`menu ${this.props.menuTriggerClassName}`}>
                        <li className="menuLi">
                            <Link to="/" className={cx({['active']:'/' === this.props.path})}>{dictionary[this.props.language].header.main}</Link>
                        </li>
                        <li className="menuLi">
                            <NavLink to="/technology" activeClassName='active'>{dictionary[this.props.language].header.technology}</NavLink>
                        </li>
                        <li className="menuLi">
                            <NavLink to="/interesting" activeClassName='active'>{dictionary[this.props.language].header.hobby}</NavLink>
                            <ul className="subMenu">
                                <li className="menuLi subMenuLi">
                                    <NavLink to="/interesting/literature" activeClassName='active'>{dictionary[this.props.language].header.literature}</NavLink>
                                </li>
                                <li className="menuLi subMenuLi">
                                    <NavLink to="/interesting/sport" activeClassName='active'>{dictionary[this.props.language].header.sport}</NavLink>
                                </li>
                                <li className="menuLi subMenuLi">
                                    <NavLink to="/interesting/games" activeClassName='active'>{dictionary[this.props.language].header.games}</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="menuLi">
                            <NavLink to="/contacts" activeClassName='active'>{dictionary[this.props.language].header.contacts}</NavLink>
                        </li>
                    </ul>
                )}
            </>
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
