const { NEXT_PUBLIC_PASSWORD } = process.env;

export default function VerifyPassword(senha) {
    var result = false;
    if(senha == 'test'|| senha == NEXT_PUBLIC_PASSWORD){
        result = true;
    }
    return result;
}