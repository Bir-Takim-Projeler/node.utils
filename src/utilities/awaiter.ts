interface Options<E> {
    error?: E;
    retry?: number;
}

export function whenResolve<T extends any, E extends any> (
    promise: Promise<T>,
    options: Options<E> = { retry: 0}
): Promise<[E | undefined, T | undefined]> {
  
    return promise
        .then<[undefined, T]>((r: T) => [ undefined, r])
        .catch<[E, undefined]>((e: E)=> {
            if(options.retry) {
                typeof (options as any).attempt === 'undefined'  ? 0 : (options as any).attempt + 1;
                if ((options as any).attempt < options.retry )
                    return whenResolve<T,E>(promise, options) as any
            }

            return [options.error ? options.error : e, undefined]
         
               
        })

}