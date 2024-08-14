
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
			<div className="bg-indigo-800 rounded">yow</div>
			<ul>
				{users.map((user: User) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</>
	)
}

export default MainPage