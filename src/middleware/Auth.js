export default function auth ({ next }){
  if(localStorage.getItem('Fikisha_token')===null){
    window.location.replace('/login')
  }
  return next()
}
