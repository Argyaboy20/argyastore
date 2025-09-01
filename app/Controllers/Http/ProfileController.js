'use strict'

class ProfileController {
    async profile({ view, session, response }) {
        try {
            // Check if user is logged in (you can implement your own auth logic)
            // For now, we'll rely on localStorage on client-side
            
            return view.render('profile', {
                title: 'Profile - Argya Store',
                meta: {
                    description: 'Kelola profil akun Anda di Argya Store',
                    keywords: 'profile, akun, pengaturan, argya store'
                }
            })
        } catch (error) {
            console.error('Error rendering profile page:', error)
            return response.redirect('/')
        }
    }

    // Handle profile photo upload (if you want server-side handling)
    async uploadPhoto({ request, response }) {
        try {
            const photo = request.file('photo', {
                types: ['image'],
                size: '1mb'
            })

            if (!photo) {
                return response.status(400).json({
                    success: false,
                    message: 'No photo uploaded'
                })
            }

            await photo.move(Helpers.publicPath('uploads/profiles'), {
                name: `${Date.now()}.${photo.subtype}`,
                overwrite: true
            })

            if (!photo.moved()) {
                return response.status(500).json({
                    success: false,
                    message: 'Failed to upload photo'
                })
            }

            return response.json({
                success: true,
                photo_url: `/uploads/profiles/${photo.fileName}`,
                message: 'Photo uploaded successfully'
            })

        } catch (error) {
            console.error('Photo upload error:', error)
            return response.status(500).json({
                success: false,
                message: 'Server error'
            })
        }
    }

    // Handle profile data update (if you want server-side handling)
    async updateProfile({ request, response, session }) {
        try {
            const { name, email, password } = request.all()

            // Validation
            if (!name || name.trim().length < 2) {
                return response.status(400).json({
                    success: false,
                    message: 'Name must be at least 2 characters'
                })
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!email || !emailRegex.test(email)) {
                return response.status(400).json({
                    success: false,
                    message: 'Invalid email format'
                })
            }

            if (password && password.length < 6) {
                return response.status(400).json({
                    success: false,
                    message: 'Password must be at least 6 characters'
                })
            }

            // Here you would typically update the database
            // For now, we'll return success since we're using localStorage on client-side
            
            return response.json({
                success: true,
                message: 'Profile updated successfully',
                data: {
                    name: name.trim(),
                    email: email.trim()
                }
            })

        } catch (error) {
            console.error('Profile update error:', error)
            return response.status(500).json({
                success: false,
                message: 'Server error'
            })
        }
    }

    // Handle logout
    async logout({ response, session }) {
        try {
            // Clear server-side session if you're using it
            // session.clear()
            
            return response.json({
                success: true,
                message: 'Logout successful'
            })
        } catch (error) {
            console.error('Logout error:', error)
            return response.status(500).json({
                success: false,
                message: 'Server error'
            })
        }
    }

    // Handle account deletion
    async deleteAccount({ response, session }) {
        try {
            // Here you would typically delete from database
            // For now, we'll just clear session and return success
            
            // session.clear()
            
            return response.json({
                success: true,
                message: 'Account deleted successfully'
            })
        } catch (error) {
            console.error('Account deletion error:', error)
            return response.status(500).json({
                success: false,
                message: 'Server error'
            })
        }
    }
}

module.exports = ProfileController