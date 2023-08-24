import { FC, useState, useEffect } from "react";
import cn from 'classnames'
import cities from 'cities.json';

import useSymbolIterator from "../../../hooks/useSimbolIterator";
import {Search} from "../search/Search";

interface DropListI {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string;
    setValue: (value: string) => void;
    numberLine: number;
    data: any;
    showSearch: boolean;
}
export const DropList:FC<DropListI> = ({open, setOpen, value, setValue, numberLine, data, showSearch}) => {

    const [search, setSearch] = useState<number>(-1)
    const [preLoader, setPreLoader] = useState<number>(100)



    return(
        <div
            className={cn(
                "absolute z-[1000] top-[100%]",
                "bg-c_grey-section w-full rounded-[8px] transition-all h-auto overflow-auto duration-500 border-[1px] border-c_grey-border",
                open ? "max-h-0 border-none" : (numberLine === 1 ? "max-h-[176px]" : "max-h-[216px]"),
            )}
        >
            <div className={cn("flex flex-col px-[16px] py-[18px]")}>
                { showSearch ?
                    <Search
                        search={search}
                        setSearch={setSearch}
                    />
                    : null
                }
                {
                    useSymbolIterator(search === -1 ? showSearch ? preLoader : data.length : 1).map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "text-c_grey-white text-[14px] leading-[19.6px] font-mont",
                                "py-[10px] hover:opacity-75 duration-500 cursor-pointer hover:scale-110"
                            )}
                            onClick={() => setValue(search === -1 ? showSearch ? cities[item].name : data[item] : cities[search].name)}
                        >
                            {search === -1 ? showSearch ? cities[item].name : data[item] : cities[search].name}
                        </div>
                    ))
                }
                <div
                    className={cn(
                        "text-c_grey-white text-[14px] leading-[19.6px] font-mont",
                        "py-[10px] hover:opacity-75 duration-500 cursor-pointer hover:scale-110"
                    )}
                    onClick={() => setPreLoader(preLoader+100)}
                >
                    еще...
                </div>
            </div>
        </div>
    )
}