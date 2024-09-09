import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri'
import { PiLinktreeLogoFill } from 'react-icons/pi'
import Avvvatars from 'avvvatars-react'

interface ProfileCardProps {
    profile: {
        avatar: string
        fullName: string
        title?: string
        description?: string
        urls?: {
            linkedinUrl: string
            githubUrl: string
            linktreeUrl: string
        }
    }
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
    return (
        <Card className="relative rounded-lg border-neutral-4 bg-neutral-4 p-6 text-neutral-1">
            <CardHeader className="flex flex-col items-center">
                {profile.avatar ? (
                    <img
                        className="mb-4 h-24 w-24 rounded-full object-cover"
                        src={profile?.avatar}
                        alt={profile.fullName || 'Unassigned'}
                    />
                ) : (
                    <Avvvatars size={96} value={profile.fullName} />
                )}
                <CardTitle className="text-lg font-bold">
                    {profile.fullName}
                </CardTitle>
                <CardDescription className="text-sm text-neutral-2">
                    {profile.title || 'No title provided'}
                </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
                <p className="text-body-m text-neutral-1">
                    {profile.description || 'No description provided.'}
                </p>
            </CardContent>

            <div className="mt-4 flex justify-center space-x-6">
                {profile.urls?.linkedinUrl && (
                    <a
                        href={profile.urls?.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-2 hover:text-primary-4"
                        aria-label="LinkedIn"
                    >
                        <RiLinkedinBoxFill size={24} />
                    </a>
                )}
                {profile.urls?.githubUrl && (
                    <a
                        href={profile.urls?.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-2 hover:text-primary-4"
                        aria-label="GitHub"
                    >
                        <RiGithubFill size={24} />
                    </a>
                )}
                {profile.urls?.linktreeUrl && (
                    <a
                        href={profile.urls?.linktreeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-2 hover:text-primary-4"
                        aria-label="Linktree"
                    >
                        <PiLinktreeLogoFill size={24} />
                    </a>
                )}
            </div>
        </Card>
    )
}
