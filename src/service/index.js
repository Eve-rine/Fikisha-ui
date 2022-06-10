import jwtInterceptor from "@/service/Interceptor";

export default async function instance(requestType, url, data = null) {
    return jwtInterceptor[requestType](url, data);
}
