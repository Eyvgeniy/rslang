import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './progstyle.css';

const normalise = (value: number) => (value - 0) * 100 / (200 - 0);

type Progress = {
    props?: object
    value?: number
}

function CircularProgressWithLabel(props: Progress): JSX.Element {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress style={{ width: '60px', height: '60px', color: '#a3a3a3' }} variant="determinate" value={normalise(props.value)} />
            <Box className='text-container'>
                <Typography style={{ fontSize: '1.5rem' }} variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}`}</Typography>
            </Box>
        </Box>
    );
}

export default function CircularStatic() {
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setProgress((prevProgress) => (prevProgress + 1));
        }, 1000);
        if (progress === 200) {
            clearInterval(timer);
        };
    }, [progress]);
    return <CircularProgressWithLabel value={progress} />;
}