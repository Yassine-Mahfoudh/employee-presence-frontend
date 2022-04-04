import { HttpErrorResponse,
     HttpEvent,
      HttpHandler,
       HttpInterceptor,
        HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService,
       private router:Router){}

    intercept(req: HttpRequest<any>,
         next: HttpHandler
         ): Observable<HttpEvent<any>> {

    if(req.headers.get('No-Auth')==="True"){
    return next.handle(req.clone());
    }

    const token = this.authService.getToken();
    
    req = this.addToken(req,token);

    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) =>{
                console.log(err.status);
                if(err.status===401){
                    this.router.navigate(['/login']);
                } else if(err.status===403){
                    this.router.navigate(['/forbidden']);
                }
                return throwError("Some thing is wrong")
                
            }
        )
    );
    }


    private addToken(request:HttpRequest<any>,token:String){
        return request.clone(
            {
                setHeaders:{
                    Authorization : `Bearer ${token}`
                }
            }
        );
    }
}
