export default function page({params}: { params: { todoId: string } }) {
    return (
        <div>
            <h1 className="text-center text-3xl">Todo selected {params.todoId}</h1>
        </div>
    )
}