import { getAllChats } from '../../repository/chatRepository';

export default defineEventHandler(() => {
	return getAllChats();
});
