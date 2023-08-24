export type ButtonType = 'active' | 'disabled'
export const ButtonState:Record<ButtonType, string> = {
    active: "bg-c_yellow text-[#000] cursor-pointer hover:opacity-80 duration-500",
    disabled: "bg-c_grey-accent text-c_grey-disabled"
}

