export default function auth ({ next }){
  console.log(localStorage.getItem('Fikisha_token'))
  if(localStorage.getItem('Fikisha_token')===null){
    window.location.replace('/login')
  }
  return next()
}
