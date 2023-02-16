import React from "react";
import "./List.scss"
import classNames from "classnames";
import Badge from "../Badge";
import removeSvg from "../../assets/img/remove.svg";
import axios from "axios";




const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
    const RemoveList = item => {
        if (window.confirm('Ви дійсно хочите видалити список? ')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    };

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                    <li key={index}
                        className={classNames(item.className,
                            {
                                'active': item.active
                                    ?
                                    item.active : activeItem && activeItem.id === item.id
                            })}
                        onClick={onClickItem ? () =>
                            onClickItem(item)
                         : null}
                    >
                        <i>
                            {item.icon ? item.icon : <Badge color={item.color.name}/>}
                        </i>
                        <span>
                    {item.name}
                            {item.tasks && ` (${item.tasks.length})`}
                </span>
                        {isRemovable && (<img className="list__remove-icon"
                                             src={removeSvg}
                                             alt="Remove Icon"
                                             onClick={() => RemoveList(item)}/>)}
                    </li>

                )
            )}

        </ul>)

}

export default List;