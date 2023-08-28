import { FC, useState, useEffect } from "react";
import cn from "classnames";
import searchIcon from "../../../assets/icon/search.svg";


import {useDebounce} from "../../../hooks/useDebounce";
import useSymbolIterator from "../../../hooks/useSimbolIterator";


interface SearchI {
    search: string[];
    setSearch: (search: string[]) => void;
    cities: string[];
}

export const Search:FC<SearchI> = ({search, setSearch, cities}) => {
    const [error, setError] = useState<boolean>(false)
    const [debounceValue, setDebounceValue] = useState<string>('')
    const [show, setShow] = useState<boolean>(true)
    const debounceItem = useDebounce(debounceValue, 100)

    useEffect(() => {
        if(debounceValue === '')
            setShow(true)
        else setShow(false)
    }, [debounceValue]);

    useEffect(() => {
        const index = cities.filter(item => item.toLowerCase().startsWith(debounceItem.toLowerCase()))
        if(index.length !== 0){
            setSearch(index)
        } else setSearch(["таких городов нет!"])
    }, [debounceItem]);

    const handlerValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setDebounceValue(e.target.value)
    }

    return(
        <div className="flex items-center w-full h-max relative">
            <input
                className={cn(
                    "flex items-center w-full h-[36px] rounded-[5px]",
                    "border-[1px] border-c_grey-base text-c_grey-white",
                    "bg-c_grey-border px-[16px] gap-x-[8px]",
                )}
                value={debounceValue}
                onChange={handlerValueInput}
                placeholder={"       Поиск.."}
            />
            { show &&
                <div className="absolute z-1 flex left-[16px]">
                    <img
                        src={searchIcon}
                        alt="vector"
                    />
                </div>
            }
        </div>

    )
}
