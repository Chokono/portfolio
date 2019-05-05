import React, { useState, useCallback, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { withTranslation } from 'react-i18next';

const dictionary = require('lib/dictionary');
const headerImagesSrc = require('lib/headerImagesSrc');

const Header = ({
  countOfLike,
  setLike,
  imageClassName,
  title,
  path,
  menuTriggerClassName,
  menuTriggerStatus,
  language,
  onMenuTriggerClick,
  onShowMenuReset,
  changeLanguage,
}) => {
  const [isHeaderImageLoading, setIsHeaderImageLoading] = useState(true);
  const clickLike = useCallback(() => {
    if (countOfLike !== 'loading') {
      setLike(countOfLike);
    }
  }, [countOfLike]);
  useEffect(() => {
    onShowMenuReset(true)();
  }, []);
  return (
    <>
      <header className={cx('header', imageClassName)}>
        <div
          className={cx('headerImBlock', imageClassName, {
            headerBlur: isHeaderImageLoading,
          })}
        />
        {isHeaderImageLoading && <div className="smallHeaderImage headerBlur" />}
        <picture className="headerImageContainer">
          <source media="(max-width: 750px)" srcSet={headerImagesSrc[imageClassName][750]} />
          <source media="(max-width: 1200px)" srcSet={headerImagesSrc[imageClassName][1200]} />
          <img
            src={headerImagesSrc[imageClassName][1920]}
            alt=""
            onLoad={() => {
              setTimeout(() => {
                setIsHeaderImageLoading(false);
              }, 200);
            }}
          />
        </picture>
        <div className="headerBlock">
          <MediaQuery query="(max-width: 749px)">
            <div className="menuTrigger" onClick={onMenuTriggerClick(menuTriggerStatus)}>
              <img
                src={
                  menuTriggerStatus
                    ? '/src/assets/img/cancel-music.svg'
                    : '/src/assets/img/menu.svg'
                }
                alt=""
                className="menuSvg"
              />
            </div>
          </MediaQuery>
          <div className="row">
            {!menuTriggerStatus && (
              <ul className={`menu ${menuTriggerClassName}`}>
                <li className="menuLi">
                  <Link to="/" className={cx({ ['active']: '/' === path })}>
                    {dictionary[language].header.main}
                  </Link>
                </li>
                <li className="menuLi">
                  <NavLink to="/technology" activeClassName="active">
                    {dictionary[language].header.technology}
                  </NavLink>
                </li>
                <li className="menuLi">
                  <NavLink to="/interesting" activeClassName="active">
                    {dictionary[language].header.hobby}
                  </NavLink>
                  <ul className="subMenu">
                    <li className="menuLi subMenuLi">
                      <NavLink to="/interesting/literature" activeClassName="active">
                        {dictionary[language].header.literature}
                      </NavLink>
                    </li>
                    <li className="menuLi subMenuLi">
                      <NavLink to="/interesting/sport" activeClassName="active">
                        {dictionary[language].header.sport}
                      </NavLink>
                    </li>
                    <li className="menuLi subMenuLi">
                      <NavLink to="/interesting/games" activeClassName="active">
                        {dictionary[language].header.games}
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="menuLi">
                  <NavLink to="/contacts" activeClassName="active">
                    {dictionary[language].header.contacts}
                  </NavLink>
                </li>
              </ul>
            )}
            <div
              className={`flag ${language}`}
              onClick={changeLanguage(language === 'ru' ? 'en' : 'ru')}
            />
          </div>
          {'/' === path ? (
            <div className="autorPhotoBlock">
              <div className="row">
                <div className="autorPhotoBlockLimit">
                  <div className="likeField" onClick={clickLike}>
                    <div className="likePush">
                      <img
                        src="/src/assets/img/likeWhite.svg"
                        alt=""
                        className="thumbsUpOnImg"
                      />
                    </div>
                    <img className="profilePhoto" src="/src/assets/img/my_photo.jpg" alt="" />
                  </div>
                  <div className="likesBlock">
                    <img
                      src="/src/assets/img/likeWhite.svg"
                      alt=""
                      className="thumbsUp"
                      onClick={clickLike}
                    />
                    <span className="countOfLikes">{countOfLike}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="headerTitle">
            <div className="row">
              <h1 className="headerTitleH1">{dictionary[language].header[title + 'Title']}</h1>
            </div>
          </div>
        </div>
      </header>
      <MediaQuery query="(max-width: 749px)">
        <div
          className={`closeMenu ${menuTriggerClassName}`}
          onClick={onMenuTriggerClick(menuTriggerStatus)}
        />
      </MediaQuery>
      {menuTriggerStatus && (
        <ul className={`menu ${menuTriggerClassName}`}>
          <li className="menuLi">
            <Link to="/" className={cx({ ['active']: '/' === path })}>
              {dictionary[language].header.main}
            </Link>
          </li>
          <li className="menuLi">
            <NavLink to="/technology" activeClassName="active">
              {dictionary[language].header.technology}
            </NavLink>
          </li>
          <li className="menuLi">
            <NavLink to="/interesting" activeClassName="active">
              {dictionary[language].header.hobby}
            </NavLink>
            <ul className="subMenu">
              <li className="menuLi subMenuLi">
                <NavLink to="/interesting/literature" activeClassName="active">
                  {dictionary[language].header.literature}
                </NavLink>
              </li>
              <li className="menuLi subMenuLi">
                <NavLink to="/interesting/sport" activeClassName="active">
                  {dictionary[language].header.sport}
                </NavLink>
              </li>
              <li className="menuLi subMenuLi">
                <NavLink to="/interesting/games" activeClassName="active">
                  {dictionary[language].header.games}
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="menuLi">
            <NavLink to="/contacts" activeClassName="active">
              {dictionary[language].header.contacts}
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};

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
    onMenuTriggerClick: status => () => {
      dispatch({
        type: 'menuTrigger',
        payload: {
          menuTriggerStatus: !status,
        },
      });
    },
    onShowMenuReset: status => () => {
      if (status) {
        dispatch({
          type: 'menuTrigger',
          payload: {
            menuTriggerStatus: false,
          },
        });
      }
    },
    changeLanguage: language => () => {
      console.log(language);
      dispatch({
        type: 'changeLanguage',
        payload: { language: language },
      });
    },
  })
)(Header);
