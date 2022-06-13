export class GlobalConstants{
    //Message
    public static genericError:string = "Un problème est survenu. Veuillez réessayer plus tard.";

    //Regex
    public static nameRegex="[a-zA-ZÀ-ÿ0-9 ]*";
    public static nomprenomRegex="[a-zA-Z ]*";
    public static emailRegex="[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static numberRegex="^[0-9]*";
    public static textRegex="/^[a-zA-ZÀ-ÿ-.*-|/0-9 ]*$/";
    public static dateRegex="(201[4-9]|202[0-9])-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])"

    //Variable
    public static error: string = "error";
}
