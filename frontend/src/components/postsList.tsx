import { Link } from "react-router";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Vote = { id: number, postId: number, voteType: 'Upvote' | 'Downvote' };
type Comment = {};

type Post = {
    title: string;
    dateCreated: string;
    memberPostedBy: any;
    comments: Comment[];
    votes: Vote[]
};

function computeVoteCount(votes: Vote[]) {
    let count = 0;
    votes.forEach((v) => v.voteType === 'Upvote' ? count++ : count--);
    return count;
}

export const PostsList = ({ posts }: { posts: Post[] }) => (
    <Card>
        <CardContent>
            <ul className="space-y-4">
                {posts.map((post, key) => (
                    <li className="flex items-center space-x-2 font-mono" key={key}>
                        <div className="flex flex-col items-center">
                            <Button variant="ghost" size="sm" className="px-0">
                                <ArrowUpIcon className="h-4 w-4"/>
                            </Button>
                            <span className="text-sm">{computeVoteCount(post.votes)}</span>
                            <Button variant="ghost" size="sm" className="px-0">
                                <ArrowDownIcon className="h-4 w-4"/>
                            </Button>
                        </div>
                        <div>
                            <div className="font-bold hover:underline">
                                {post.title}
                            </div>
                            <div className="post-item-details">
                                <p className="text-sm text-gray-500">
                                    {dayjs(post.dateCreated).fromNow()} | by {" "}
                                    <Link to={`/member/${post.memberPostedBy.user.username}`} className="text-blue-600 hover:underline">
                                        {post.memberPostedBy.user.username}
                                    </Link> | {" "}
                                    {post.comments.length}{" "}{post.comments.length !== 1 ? `comments` : "comment"}
                                </p>
                            </div>
                        </div>
                    </li>
                    ))}
            </ul>
        </CardContent>
    </Card>
);