import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '@/graphql/Queries'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ProfileCard } from '@/components/ProfileCard'
import { Loading } from '@/components/ui/loading'
import ErrorMessage from '@/components/ui/error-message'

const Profile: React.FC = () => {
    const { data, loading, error } = useQuery(GET_PROFILE)

    const defaultProfile = {
        fullName: 'Edison Paria Fernandez',
        bio: 'Software Engineer with 5+ years of experience designing and developing web applications using modern technologies.',
        email: 'edisonparia@gmail.com',
        title: 'Software Engineer',
        description:
            'Ready to prove my value and talent at an emerging company. Motivated to advance and expand my skill set through mentorship and challenging projects.',
        urls: {
            githubUrl: 'https://github.com/edisonparia',
            linkedinUrl: 'https://www.linkedin.com/in/edisonparia/',
            linktreeUrl: 'https://linktr.ee/edisonparia',
        },
    }

    if (loading) return <Loading />

    if (error) return <ErrorMessage message={error.message} />

    const profileData = {
        fullName: data?.profile.fullName || defaultProfile.fullName,
        avatar: data?.profile.avatar,
        email: defaultProfile.email,
        bio: defaultProfile.bio,
        title: defaultProfile.title,
        description: defaultProfile.description,
        urls: {
            githubUrl: defaultProfile.urls.githubUrl,
            linkedinUrl: defaultProfile.urls.linkedinUrl,
            linktreeUrl: defaultProfile.urls.linktreeUrl,
        },
    }

    return (
        <div className="flex flex-col space-y-6 py-6 text-neutral-2 lg:flex-row lg:space-x-6 lg:space-y-0">
            <div className="w-full items-center rounded-lg bg-neutral-4 px-4 py-6 text-neutral-2 lg:w-3/5">
                <div className="space-y-4">
                    <h3 className="text-display-s text-neutral-1">Profile</h3>
                </div>

                <form className="space-y-6 text-body-m text-neutral-1">
                    <div className="space-y-2">
                        <label htmlFor="username">Username</label>
                        <Input
                            id="username"
                            name="username"
                            placeholder="Username"
                            className="border-neutral-4 bg-neutral-3 text-neutral-1 placeholder-neutral-2"
                            defaultValue={profileData.fullName}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="border-neutral-4 bg-neutral-3 text-neutral-1 placeholder-neutral-2"
                            defaultValue={profileData.email}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="bio">Bio</label>
                        <Textarea
                            id="bio"
                            name="bio"
                            placeholder="Tell us a little bit about yourself"
                            className="border-neutral-4 bg-neutral-3 text-neutral-1 placeholder-neutral-2"
                            rows={5}
                            defaultValue={profileData.bio}
                        />
                    </div>

                    {/* Campo de URLs */}
                    <div className="space-y-2">
                        <label htmlFor="urls">URLs</label>
                        <Input
                            id="urls"
                            name="urls"
                            className="border-neutral-4 bg-neutral-3 text-neutral-1 placeholder-neutral-2"
                            placeholder="https://github.com/edisonparia"
                            defaultValue={profileData.urls.githubUrl}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="rounded-lg bg-primary-4 px-6 py-2 text-neutral-1 hover:bg-primary-3"
                    >
                        Update profile
                    </Button>
                </form>
            </div>

            <div className="w-full lg:w-2/5">
                <ProfileCard profile={profileData} />
            </div>
        </div>
    )
}

export default Profile
