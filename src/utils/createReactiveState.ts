export function createReactiveState<T extends object>(
    initialState: T, 
    onChange: (state: T) => void
): T {
    return new Proxy(initialState, {
        set: (target, property, value) => {
            target[property as keyof T] = value;
            onChange(target);
            return true;
        }
    });
}