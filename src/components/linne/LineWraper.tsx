import {FC} from "react";
import cn from 'classnames';
interface LineWrapperI {
    border?: boolean;
    children: any;
}

export const LineWrapper:FC<LineWrapperI> = ({children, border}): any => {

    return(
        <div className={cn("flex xl:flex-nowrap flex-wrap md:items-start md:justify-start justify-between px-[20.5px] mb-[32px] gap-x-[45px]")}>
            {children}
        </div>
    )
}