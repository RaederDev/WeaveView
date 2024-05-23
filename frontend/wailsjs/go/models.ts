export namespace models {
	
	export class GraphQLErrorLocationsItems0 {
	    column?: number;
	    line?: number;
	
	    static createFrom(source: any = {}) {
	        return new GraphQLErrorLocationsItems0(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.column = source["column"];
	        this.line = source["line"];
	    }
	}
	export class GraphQLError {
	    locations: GraphQLErrorLocationsItems0[];
	    message?: string;
	    path: string[];
	
	    static createFrom(source: any = {}) {
	        return new GraphQLError(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.locations = this.convertValues(source["locations"], GraphQLErrorLocationsItems0);
	        this.message = source["message"];
	        this.path = source["path"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class GraphQLResponse {
	    data?: {[key: string]: any};
	    errors?: GraphQLError[];
	
	    static createFrom(source: any = {}) {
	        return new GraphQLResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.data = source["data"];
	        this.errors = this.convertValues(source["errors"], GraphQLError);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

