import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'store';
import { useFormik } from 'formik';
import { format } from 'date-fns';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

// material-ui
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import { openSnackbar } from 'store/slices/snackbar';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';

// assets
import CloseIcon from '@mui/icons-material/Close';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

// generate random
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

// modal position
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const TIME_SPANS = {
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    YEARLY: 'Yearly'
};

const MONTH_SPANS = {
    JANUARY: 'January',
    FEBRUARY: 'February',
    MARCH: 'March',
    APRIL: 'April',
    MAY: 'May',
    JUNE: 'June',
    JULY: 'July',
    AUGUST: 'August',
    SEPTEMBER: 'September',
    OCTOBER: 'October',
    NOVEMBER: 'November',
    DECEMBER: 'December'
};

const DAY_SPANS = {
    ONE: '1',
    TWO: '2',
    THREE: '3',
    FOUR: '4',
    FIVE: '5',
    SIX: '6',
    SEVEN: '7',
    EIGHT: '8',
    NINE: '9',
    TEN: '10',
    ELEVEN: '11',
    TWELVE: '12',
    THIRTEEN: '13',
    FOURTEEN: '14',
    FIFTEEN: '15',
    SIXTEEN: '16',
    SEVENTEEN: '17',
    EIGHTEEN: '18',
    NINETEEN: '19',
    TWENTY: '20',
    TWENTYONE: '21',
    TWENTYTWO: '22',
    TWENTYTHREE: '23',
    TWENTYFOUR: '24',
    TWENTYFIVE: '25',
    TWENTYSIX: '26',
    TWENTYSEVEN: '27',
    TWENTYEIGHT: '28',
    TWENTYNINE: '29',
    THIRTY: '30',
    THIRTYONE: '31'
};

const YEAR_SPANS = {
    TWENTYTWENTY: '2020',
    TWENTYTWENTYONE: '2021',
    TWENTYTWENTYTWO: '2022',
    TWENTYTWENTYTHREE: '2023',
    TWENTYTWENTYFOUR: '2024',
    TWENTYTWENTYFIVE: '2025',
    TWENTYTWENTYSIX: '2026'
};

const validationSchema = yup.object({
    name: yup.string().required('Name is required.'),
    amount: yup
        .string()
        .required('Max Amount is required.')
        .test('is-valid-number', 'Amount must be a number.', (value) => {
            if (!value) return false;
            const parsed = parseFloat(value.replace(/,/g, ''));
            return !isNaN(parsed);
        })
        .test('is-positive', 'Amount must be a positive number.', (value) => {
            if (!value) return false;
            const parsed = parseFloat(value.replace(/,/g, ''));
            return parsed > 0;
        }),
    time: yup
        .string()
        .oneOf([TIME_SPANS.WEEKLY, TIME_SPANS.MONTHLY, TIME_SPANS.YEARLY], 'Invalid selection for Time Span.')
        .required('Time Span selection is required.'),
    month: yup
        .string()
        .oneOf(
            [
                MONTH_SPANS.JANUARY,
                MONTH_SPANS.FEBRUARY,
                MONTH_SPANS.MARCH,
                MONTH_SPANS.APRIL,
                MONTH_SPANS.MAY,
                MONTH_SPANS.JUNE,
                MONTH_SPANS.JULY,
                MONTH_SPANS.AUGUST,
                MONTH_SPANS.SEPTEMBER,
                MONTH_SPANS.OCTOBER,
                MONTH_SPANS.NOVEMBER,
                MONTH_SPANS.DECEMBER
            ],
            'Invalid selection for Month Span.'
        )
        .required('Month Span selection is required.'),
    day: yup
        .string()
        .oneOf(
            [
                DAY_SPANS.ONE,
                DAY_SPANS.TWO,
                DAY_SPANS.THREE,
                DAY_SPANS.FOUR,
                DAY_SPANS.FIVE,
                DAY_SPANS.SIX,
                DAY_SPANS.SEVEN,
                DAY_SPANS.EIGHT,
                DAY_SPANS.NINE,
                DAY_SPANS.TEN,
                DAY_SPANS.ELEVEN,
                DAY_SPANS.TWELVE,
                DAY_SPANS.THIRTEEN,
                DAY_SPANS.FOURTEEN,
                DAY_SPANS.FIFTEEN,
                DAY_SPANS.SIXTEEN,
                DAY_SPANS.SEVENTEEN,
                DAY_SPANS.EIGHTEEN,
                DAY_SPANS.NINETEEN,
                DAY_SPANS.TWENTY,
                DAY_SPANS.TWENTYONE,
                DAY_SPANS.TWENTYTWO,
                DAY_SPANS.TWENTYTHREE,
                DAY_SPANS.TWENTYFOUR,
                DAY_SPANS.TWENTYFIVE,
                DAY_SPANS.TWENTYSIX,
                DAY_SPANS.TWENTYSEVEN,
                DAY_SPANS.TWENTYEIGHT,
                DAY_SPANS.TWENTYNINE,
                DAY_SPANS.THIRTY,
                DAY_SPANS.THIRTYONE
            ],
            'Invalid selection for Day Span.'
        )
        .required('Day Span selection is required.'),
    year: yup
        .string()
        .oneOf(
            [
                YEAR_SPANS.TWENTYTWENTY,
                YEAR_SPANS.TWENTYTWENTYONE,
                YEAR_SPANS.TWENTYTWENTYTWO,
                YEAR_SPANS.TWENTYTWENTYTHREE,
                YEAR_SPANS.TWENTYTWENTYFOUR,
                YEAR_SPANS.TWENTYTWENTYFIVE,
                YEAR_SPANS.TWENTYTWENTYSIX
            ],
            'Invalid selection for Year Span.'
        )
        .required('Year Span selection is required.')
    // date: yup.date().typeError('Date is required.').required('Start Date is required.')
});

const Body = React.forwardRef(({ modalStyle, handleClose, onSubmit }, ref) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: '',
            time: TIME_SPANS.WEEKLY, // Set to a default valid value
            month: '',
            day: '',
            year: ''
            // date: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const cleanedAmount = parseFloat(values.amount.replace(/,/g, ''));
            onSubmit(values.name, cleanedAmount, values.time, values.month, values.day, values.year);
        }
    });

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                sx={{
                    position: 'absolute',
                    width: {
                        xs: 280,
                        sm: 500,
                        lg: 650
                    },
                    maxHeight: '80vh', // Limits the modal height to 80% of the viewport height
                    overflowY: 'auto', // Enables scrolling if content overflows
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                title="New Budget"
                content={false}
                secondary={
                    <IconButton onClick={handleClose} size="large" aria-label="close modal">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <InputLabel>Name</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder=" "
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Max Amount</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="0.00"
                                    name="amount"
                                    value={formik.values.amount}
                                    onChange={(event) => {
                                        let rawValue = event.target.value.replace(/\D/g, '');
                                        if (!rawValue) rawValue = '0';

                                        const numberValue = parseFloat(rawValue) / 100;
                                        const formattedValue = numberValue.toLocaleString('en-US', {
                                            style: 'decimal',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        });

                                        formik.setFieldValue('amount', formattedValue);
                                    }}
                                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                                    helperText={formik.touched.amount && formik.errors.amount}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Time Span</InputLabel>
                                <FormControl fullWidth error={formik.touched.time && Boolean(formik.errors.time)}>
                                    <Select
                                        labelId="time-select"
                                        id="time"
                                        name="time"
                                        value={formik.values.time}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={TIME_SPANS.WEEKLY}>Weekly</MenuItem>
                                        <MenuItem value={TIME_SPANS.MONTHLY}>Monthly</MenuItem>
                                        <MenuItem value={TIME_SPANS.YEARLY}>Yearly</MenuItem>
                                    </Select>
                                    {formik.touched.time && formik.errors.time && <FormHelperText>{formik.errors.time}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <InputLabel>Start Date</InputLabel>
                                <FormControl fullWidth error={formik.touched.month && Boolean(formik.errors.month)}>
                                    <Select
                                        labelId="month-select"
                                        id="month"
                                        name="month"
                                        value={formik.values.month}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={MONTH_SPANS.JANUARY}>January</MenuItem>
                                        <MenuItem value={MONTH_SPANS.FEBRUARY}>February</MenuItem>
                                        <MenuItem value={MONTH_SPANS.MARCH}>March</MenuItem>
                                        <MenuItem value={MONTH_SPANS.APRIL}>April</MenuItem>
                                        <MenuItem value={MONTH_SPANS.MAY}>May</MenuItem>
                                        <MenuItem value={MONTH_SPANS.JUNE}>June</MenuItem>
                                        <MenuItem value={MONTH_SPANS.JULY}>July</MenuItem>
                                        <MenuItem value={MONTH_SPANS.AUGUST}>August</MenuItem>
                                        <MenuItem value={MONTH_SPANS.SEPTEMBER}>September</MenuItem>
                                        <MenuItem value={MONTH_SPANS.OCTOBER}>October</MenuItem>
                                        <MenuItem value={MONTH_SPANS.NOVEMBER}>November</MenuItem>
                                        <MenuItem value={MONTH_SPANS.DECEMBER}>December</MenuItem>
                                    </Select>
                                    {formik.touched.month && formik.errors.month && <FormHelperText>{formik.errors.month}</FormHelperText>}
                                </FormControl>
                                <FormControl fullWidth error={formik.touched.day && Boolean(formik.errors.day)}>
                                    <Select
                                        labelId="day-select"
                                        id="day"
                                        name="day"
                                        value={formik.values.day}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={DAY_SPANS.ONE}>1</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWO}>2</MenuItem>
                                        <MenuItem value={DAY_SPANS.THREE}>3</MenuItem>
                                        <MenuItem value={DAY_SPANS.FOUR}>4</MenuItem>
                                        <MenuItem value={DAY_SPANS.FIVE}>5</MenuItem>
                                        <MenuItem value={DAY_SPANS.SIX}>6</MenuItem>
                                        <MenuItem value={DAY_SPANS.SEVEN}>7</MenuItem>
                                        <MenuItem value={DAY_SPANS.EIGHT}>8</MenuItem>
                                        <MenuItem value={DAY_SPANS.NINE}>9</MenuItem>
                                        <MenuItem value={DAY_SPANS.TEN}>10</MenuItem>
                                        <MenuItem value={DAY_SPANS.ELEVEN}>11</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWELVE}>12</MenuItem>
                                        <MenuItem value={DAY_SPANS.THIRTEEN}>13</MenuItem>
                                        <MenuItem value={DAY_SPANS.FOURTEEN}>14</MenuItem>
                                        <MenuItem value={DAY_SPANS.FIFTEEN}>15</MenuItem>
                                        <MenuItem value={DAY_SPANS.SIXTEEN}>16</MenuItem>
                                        <MenuItem value={DAY_SPANS.SEVENTEEN}>17</MenuItem>
                                        <MenuItem value={DAY_SPANS.EIGHTEEN}>18</MenuItem>
                                        <MenuItem value={DAY_SPANS.NINETEEN}>19</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTY}>20</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYONE}>21</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYTWO}>22</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYTHREE}>23</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYFOUR}>24</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYFIVE}>25</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYSIX}>26</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYSEVEN}>27</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYEIGHT}>28</MenuItem>
                                        <MenuItem value={DAY_SPANS.TWENTYNINE}>29</MenuItem>
                                        <MenuItem value={DAY_SPANS.THIRTY}>30</MenuItem>
                                        <MenuItem value={DAY_SPANS.THIRTYONE}>31</MenuItem>
                                    </Select>
                                    {formik.touched.day && formik.errors.day && <FormHelperText>{formik.errors.day}</FormHelperText>}
                                </FormControl>
                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={formik.values.date ? new Date(formik.values.date + 'T00:00:00') : null}
                                        onChange={(newValue) => {
                                            if (newValue) {
                                                // Format to a local date string for DB storage (YYYY-MM-DD)
                                                const formattedDate = format(newValue, 'yyyy-MM-dd');
                                                formik.setFieldValue('date', formattedDate);
                                            } else {
                                                formik.setFieldValue('date', '');
                                            }
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                name: 'date',
                                                placeholder: 'Select Date',
                                                error: formik.touched.date && Boolean(formik.errors.date),
                                                helperText: formik.touched.date && formik.errors.date
                                            }
                                        }}
                                    />
                                </LocalizationProvider> */}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <Button type="submit" variant="contained" color="secondary">
                                    Submit
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="outlined" onClick={formik.handleReset}>
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </form>
            </MainCard>
        </div>
    );
});

Body.propTypes = {
    modalStyle: PropTypes.object,
    handleClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
};

// ==============================|| SIMPLE MODAL ||============================== //

export default function SimpleModal({ onSubmit }) {
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container justifyContent="flex-end">
            <Tooltip title="Add Budget" placement="left">
                <Fab size="small" color="primary" aria-label="new todo add" onClick={handleOpen}>
                    <AddRoundedIcon fontSize="small" onClick={handleOpen} />
                </Fab>
            </Tooltip>

            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
                <Body
                    modalStyle={modalStyle}
                    handleClose={handleClose}
                    onSubmit={(name, amount, time, date) => {
                        onSubmit(name, amount, time, date);
                        handleClose();
                    }}
                />
            </Modal>
        </Grid>
    );
}

SimpleModal.propTypes = {
    onSubmit: PropTypes.func.isRequired
};
