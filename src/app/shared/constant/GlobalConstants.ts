export class GlobalConstants{
    //Message
    public static genericError:string = "Something went wrong. Please try again later";

    //Regex
    public static nameRegex="[a-zA-Z]*";
    public static emailRegex="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static numberRegex="^[e0-9]{10.10}$";
    public static textRegex="/[^A-Za-z0-9]+/";
    public static dateRegex="^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$";
    

    //Variable
    public static error: string = "error";
}
