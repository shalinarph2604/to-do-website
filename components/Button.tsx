interface ButtonProps {
    label: string;
    disabled?: boolean;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
    label,
    disabled,
    onClick
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className='
                disabled:opacity-70
                disabled:cursor-not-allowed
                hover:opacity-90
                cursor-pointer
                transition
                rounded-lg
                bg-indigo-600
                text-white
                font-semibold
                text-md
                px-4 py-2
                w-3xs
            '
        >
            {label}
        </button>
    )
}

export default Button