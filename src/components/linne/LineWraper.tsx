import {FC} from "react";
import cn from 'classnames';
interface LineWrapperI {
    border?: boolean;
    children: any;
}

export const LineWrapper:FC<LineWrapperI> = ({children, border}): any => {

    return(
        <div className={cn(
            "flex xl:flex-nowrap flex-wrap md:items-start md:justify-start justify-between",
            "mb-[32px] gap-x-[77.5px] md:mx-0 mx-[20px]"
        )}>
            {children}
        </div>
    )
}