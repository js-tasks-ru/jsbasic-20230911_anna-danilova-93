const toggleText = () => {
  const textHid = document.querySelector('#text');
  const btnOffOn = document.querySelector('.toggle-text-button');

  const actionHidden = () => textHid.hidden = !textHid.hidden

  btnOffOn.addEventListener( 'click' , actionHidden);

  return () => btnOffOn.removeEventListener( 'click' , actionHidden)
}
