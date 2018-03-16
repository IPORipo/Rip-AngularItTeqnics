import { Router, ActivatedRoute } from "@angular/router";
// ActivatedRoute vs ActivatedRouteSnapshot difference

export class RipRedirect {
    pathIdParam: number;
    constructor(private router: Router, private currentRoute: ActivatedRoute) {
        // This is a way to get parameter from the route
        currentRoute.snapshot.params['id'];
    }

    onRedirect(ripRoute: string) {
        // navigate method redirects to route.Gets massive that has parameter of
        // on which route we are redirecting,each parameter of massive will be part of the route
        // ex ['../','server','5'] result will be '../server/5'
        this.router.navigate([ripRoute]);
        
        //Manualy navigate url and pass url parameters 
        // By default navigate function dont pay attention to current route and 
        // navigates to route from root.Thats why we can give to navigate more
        // more infromation passing as second argument,javascript object with relativeTo property 
        this.router.navigate([ripRoute], { 
            relativeTo: this.currentRoute,
            
            // Its to preserve queryparameters(that are after question)and pass it to newly created rote
            queryParamsHandling:'preserve',
            // query parameters
            queryParams:{
                allowEdit:1,
                allowDelete:0,
            },
            // fragment is like a tag that refers on some part of page (ex:#documents)
            fragment:'documents'
         });
    }
}