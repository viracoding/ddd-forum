// import { useEffect, useState } from "react";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { faker } from '@faker-js/faker';

export const MainPage = () => {
    const posts = Array.from({ length: 10 }, () => ({
        title: faker.lorem.sentence(),
        dateCreated: faker.date.past().toISOString(),
        memberPostedBy: { user: { username: faker.internet.username() } },
        comments: Array.from({ length: faker.number.int({ min: 0, max: 10 }) }, () => ({})),
        votes: Array.from({ length: faker.number.int({ min: 0, max: 20 }) }, (_, index) => ({
            id: index,
            postId: faker.number.int(),
            voteType: faker.helpers.arrayElement(['Upvote', 'Downvote'])
        }))
    }));

    return (
        <>
            <PostsViewSwitcher />
            <PostsList
                posts={posts}
            />
        </>
    );
};