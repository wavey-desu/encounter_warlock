
interface User {
	name: string,
	email: string,
	id: string
}

const MainPage = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/users', {
		cache: 'no-store'
		//get data every 10 seconds
		// next: {revalidate}
	})
	const users: User[] = await res.json()

	return (
		<>
			<div className="w-full h-full flex justify-center p-6">
				<ul>
					{users.slice(0,5).map((user: User, index) => (
						<li key={user.id}>{user.name} {index}</li>
					))}
				</ul>
			</div>
		</>
	)
}

export default MainPage