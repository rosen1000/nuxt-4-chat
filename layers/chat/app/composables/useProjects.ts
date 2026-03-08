export default function useProjects() {
	const projects = useState('projects', () => [MOCK_PROJECT]);

	function createProject() {
		const id = (projects.value.length + 1).toString();
		const project: Project = { id, name: 'New Project', createdAt: new Date(), updatedAt: new Date() };
		projects.value.push(project);
		return project;
	}

	return { projects, createProject };
}
