interface Options<E> {
    error?: E;
    retry?: number;
}

export function Awaiter<T extends any, E extends any> (
    promise: Promise<T>,
    options: Options<E> = { retry: 0}
): Promise<[E | undefined, T | undefined]> {
  
    return promise
        .then<[undefined, T]>((r) => [ undefined, r])
        .catch<[E, undefined]>((e: any)=> {
            if(options.retry) {
                typeof (options as any).attempt === 'undefined'  ? 0 : (options as any).attempt + 1;
                if ((options as any).attempt < options.retry )
                    return Awaiter<T,E>(promise, options) as any
            }

            return [options.error ? options.error : undefined]
         
               
        })

}