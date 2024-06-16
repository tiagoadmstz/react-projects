import '../components/Button.css';

interface ButtonProps {
    label: string;
    click?: (btValue: string) => void;
    operation?: boolean;
    triple?: boolean;
    double?: boolean;
}

export default function Button(props: ButtonProps) {
    const classes = ['button'];
    if (props.triple) classes.push('triple');
    if (props.double) classes.push('double');
    if (props.operation) classes.push('operation');

    return (
        <button 
            className={classes.join(' ')}
            onClick={() => props.click && props.click(props.label)}
        >
            {props.label}
        </button>
    );
}
