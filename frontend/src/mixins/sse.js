const sse = ({ url ='http://localhost:4000', query, variables, CLB }) => {



const URLInstance = new URL(url)

URLInstance.searchParams.append(
    'query',
    query
)
URLInstance.searchParams.append('variables', JSON.stringify(variables))

const eventsource = new EventSource(URLInstance.toString(), {
    withCredentials: true
})

eventsource.onmessage = function (event) {
    const data = JSON.parse(event.data)
    CLB(event)
}
eventsource.onerror = (e) => {
    console.log("An error occurred while attempting to connect.");
};
}
export default sse