import type {NitroFetchOptions, NitroFetchRequest} from 'nitropack';

export function useSubmit<ResponseType, ErrorType =  unknown>() {
    const pending = ref(false);
    const data = ref<ResponseType>();
    const error = ref<ErrorType>();
    const {$api} = useNuxtApp();

    async function sendRequest(
        request: NitroFetchRequest,
        opts?: NitroFetchOptions<NitroFetchRequest, 'patch' | 'post' | 'put' | 'delete'> | undefined
    ) {
        try {
            error.value = undefined;
            pending.value = true;
            const response = await $api<ResponseType>(request, opts);
            data.value = response as ResponseType;
        } catch (e) {
            error.value = e as ErrorType;
        } finally {
            pending.value = false;
        }
    }

    return {
        pending,
        data,
        error,
        sendRequest,
    };
}
