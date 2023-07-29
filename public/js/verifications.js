
window.onload = () => {
  const verificationBtns = document.querySelectorAll('.btn-verification');


  verificationBtns.forEach(btn => {
    btn.onclick = (event) => {
      const validationValue = event.target.value === 'true' ? true : false;

      axios.post(`/artworks/${window.artwork}/verify`, {
        validation: validationValue
      })
        .then((response) => {
          const value = Number(btn.innerText);

          const handleVerificationBtn = (fillClass, outlineClass, siblingFillClass, siblingOutlineClass) => {
            const sibling = document.querySelector(`.${siblingFillClass}`);
        
            if (sibling) {
              const siblingValue = Number(sibling.innerText)
              sibling.innerText = siblingValue - 1;
              sibling.classList.remove(siblingFillClass);
              sibling.classList.add(siblingOutlineClass);
            }
        
            if (btn.classList.contains(fillClass)) {
              btn.innerText = value - 1;
            } else {
              btn.innerText = value + 1;
            }
        
            btn.classList.toggle(fillClass)
            btn.classList.toggle(outlineClass)
          }

          // Gestiono el botón que clico
          if (validationValue) {
            handleVerificationBtn(
              'btn-success',
              'btn-outline-success',
              'btn-danger',
              'btn-outline-danger'
            )
          } else {
            handleVerificationBtn(
              'btn-danger',
              'btn-outline-danger',
              'btn-success',
              'btn-outline-success',
            )
          }

        })
        .catch(err => console.error(err))
    }
  })
}