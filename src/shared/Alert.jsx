import Alert from 'react-bootstrap/Alert';

function AlertPopup({ props }) {
  return (
    <>
     
        <Alert key={props.variant} variant={props.variant}>
          {props.message}
        </Alert>
   

      {/* {[
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
      ].map((variant) => (
        <Alert key={variant} variant={variant}>
          This is a {variant} alert—check it out!
        </Alert>
      ))} */}
    </>
  );
}

export default AlertPopup;