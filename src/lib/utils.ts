export function isValidEmail(email: string): boolean {
    const regex = /.+@.+\..+/;
    return regex.test(email);
}