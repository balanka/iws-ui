import React, {useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import {useStore} from "../../views/base/Components/Menu";

const CCreateElement = ({ items, components = {}, fn}) => {
    const { setSelected } = useStore();
    const renderItem = useCallback( (item, i) => {
        const { _tag, _children, ...rest } = item
        const Tag = components[_tag] || _tag
        const children = _children ? _children.map((child, i) => {
            return typeof child === 'object' ? renderItem(child, i) : [child]
        }) : ''
        return <Tag key={Tag + i} {...rest}
               onClick ={(e)=> item._children?void(0):setSelected(item.to)}>{children}</Tag>
    }, );

    const generatedItems = useMemo(() => {
        return items && items.map((item, i) => renderItem(item, i));
    }, [items])

    return (
        <React.Fragment>
            {generatedItems}
        </React.Fragment>
    )
}

CCreateElement.propTypes = {
    items: PropTypes.array.isRequired,
    components: PropTypes.object
};

export default CCreateElement