import './Display.css'

interface DisplayProps {
    value: string
}

export default function Display(props: DisplayProps) {
    return (
        <div className="display">{props.value}</div>
    )
}
