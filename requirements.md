uptill now trying to solve two major problems 
1 :: the accesstoken is stored in the react memory and not local storage 
this protects against the XSS but this will cause problems when the user refreshe the browser
2 :: if the access token is expired somewhere between the commmunication this will break the code silently 
so we need to again create that thing 
so the solution is making interceptors 
what it does is that checks every request and see if there is access bearer token attached with it 
then if not attach manually 
if the access is expired create new and attach in the request 

while making the request interceptors we came across with the config 
actually before passing the HTTP request the axios converts it into an object having some properties headers 
axios allows you to change them or intercept the incoming requests and change it accordingly 


NOw what to do when the accesstoken expires then he app would silently crash 
but we want to prevent that thing so what we do is make the response interceptor takes the original request which 
was sent  .. if there is no error in response do nothing 
if there is 401 response then we will see that either we have tried to resend the same reqest or not if not generate a accesstoken
and patch it in the privious req and re sends it 
the checking of already retried or not is helpful can save us from infinite loop 
