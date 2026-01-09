import React from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {CBadge, CNavLink, CSidebarNav} from '@coreui/react'
import { useStore } from '../form/Menu'
import SimpleBar from "simplebar-react";

export const AppSidebarNav = ({ items}:{items:any[]}) => {
  //console.log('items>>>>>>>>', items)
  const { setSelected } = useStore()
 // console.log('selected>>>>>>>>', selected)
  //console.log('setSelected>>>>>>>>', setSelected)
  const location = useLocation()
  const navigate = useNavigate()
  const navLink = (name:any, icon:any, badge?:any, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }
  const navLink1 = (name:any, icon:any, badge?:any, indent = false) => {
    return (
        <>
          {icon
              ? icon
              : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
          )}
          {name && name}
          {badge && (
              <CBadge color={badge.color} className="ms-auto" size="sm">
                {badge.text}
              </CBadge>
          )}
        </>
    )
  }
  const navItem1 = (item:any, index:any, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
        <Component as="div" key={index}>
          {rest.to || rest.href ? (
              <CNavLink
                  {...(rest.to && { as: NavLink })}
                  {...(rest.href && { target: '_blank', rel: 'noopener noreferrer' })}
                  {...rest}
                  onClick={() => {
                    setSelected(rest.to)
                    console.log('restXXX', rest)
                    navigate(rest.to)
                  }}
              >
                {navLink1(name, icon, badge, indent)}


              </CNavLink>
          ) : (
              navLink(name, icon, badge, indent)
          )}
        </Component>
    )
  }
  const navItem = (item:any, index:any, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
        onClick={() => {
          setSelected(rest.to)
          navigate(rest.to)
        }}
      >
        {navLink(name, icon, badge, indent)}
      </Component>
    )
  }
  const navGroup1 = (item:any, index:any) => {
    const { component, name, icon, items, to, ...rest } = item
    const Component = component
    return (
        <Component compact as="div" key={index} toggler={navLink1(name, icon)} {...rest}>
          {items?.map((item:any, index:any) =>
              item.items ? navGroup1(item, index) : navItem1(item, index, true),
          )}
        </Component>
    )
  }
  const navGroup = (item:any, index:any) => {
    const { component, name, icon, items, to, ...rest } = item
    //console.log('item>>>', item)
    const Component = component
    return (
      <Component
        compact
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
        onClick={(e:any) => console.log('onClick ', e.target + 'to>>>' + to)}
      >
        {item.items?.map((item:any, index:any) =>
          item.items ? navGroup(item, index) : navItem(item, index, true),
        )}
      </Component>
    )
  }
  return (
      <CSidebarNav as={SimpleBar}>
        {items &&
            items.map((item, index) => (item.items ? navGroup1(item, index) : navItem1(item, index)))}
      </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
