import Swal from 'sweetalert2'

export const niceAlert =  (titleVal,time=2000 ,iconVal='error') => Swal.fire({
    position: 'center',
    icon: iconVal,
    title: titleVal,
    showConfirmButton: false,
    timer: time
  })