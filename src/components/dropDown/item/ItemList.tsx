import { FC, useState } from "react";
import cn from 'classnames';
import useSymbolIterator from "../../../hooks/useSimbolIterator";

import down from "../../../assets/icon/CaretDown.svg"

interface ItemI {
    item: string;
    defaultText: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const ItemList:FC<ItemI> = ({item, defaultText, open, setOpen}) => {

    const [touch, setTouch] = useState<boolean>(false)

    return(
        <div
            className={cn(
                "w-full max-h-[48px] h-[48px] overflow-none relative flex items-center cursor-pointer",
                "rounded-[4px] bg-c_grey-base px-[24px] mb-[8px] duration-500 border-[1px] border-c_grey-border",
                !open ? "border-[1px] border-c_yellow" : ""
            )}
            onClick={() => setOpen(!open)}
            onMouseEnter={() => setTouch(true)}
            onMouseLeave={() => setTouch(false)}
        >
            <b
                className={cn(
                    "text-[16px] leading-[22.4px] font-inter font-normal h-[22px]",
                    open && item === defaultText ? "text-c_grey-disabled" : "text-c_grey-white",

                )}
            >
                {useSymbolIterator(item.length).map((i, index) => (
                    index <= 23 ? item[i] : null
                ))}
                {item !== defaultText && item.length > 23 ? "..." : null}
            </b>
            <div className={cn(
                !open || touch ? '' : 'rotate-[180deg]',
                'w-[24px] h-[24px] absolute z-1 right-[24px] duration-300',
                'flex items-center justify-center',
            )}>
                <img
                    src={down}
                    alt="vector"
                />
            </div>
        </div>
    )
}