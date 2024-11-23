const URI = "http://localhost:5000/api/textsearch";

export async function textSearchApi<T>(textSearchObject: T): Promise<Number> {
    try {
        const resp = await fetch(`${URI}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(textSearchObject)
        });

        const numberOfOccurrence = await resp.json();

        return numberOfOccurrence;
    } catch (error) {
        throw error;
    }
}